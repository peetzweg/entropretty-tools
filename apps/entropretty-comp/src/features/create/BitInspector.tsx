import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const byteSchema = z.object({
  decimal: z.string(),
  hex: z.string(),
})

type ByteFormData = z.infer<typeof byteSchema>

interface BitInspectorProps {
  bytes: number[]
  onChange?: (bytes: number[]) => void
}

export function BitInspector({
  bytes: initialBytes,
  onChange,
}: BitInspectorProps) {
  const [bytes, setBytes] = useState(initialBytes)

  const updateByte = (index: number, newValue: number) => {
    const newBytes = [...bytes]
    newBytes[index] = Math.min(255, Math.max(0, newValue))
    setBytes(newBytes)
    onChange?.(newBytes)
  }

  const toggleBit = (byteIndex: number, bitIndex: number) => {
    const byte = bytes[byteIndex]
    const mask = 1 << (7 - bitIndex)
    const newByte = byte ^ mask
    updateByte(byteIndex, newByte)
  }

  const getBit = (byte: number, index: number): number => {
    return (byte >> (7 - index)) & 1
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="">
        {bytes.map((byte, byteIndex) => (
          <ByteRow
            key={byteIndex}
            index={byteIndex}
            value={byte}
            onChange={(newValue) => updateByte(byteIndex, newValue)}
            onToggleBit={(bitIndex) => toggleBit(byteIndex, bitIndex)}
            getBit={(bitIndex) => getBit(byte, bitIndex)}
          />
        ))}
      </div>
    </div>
  )
}

interface ByteRowProps {
  index: number
  value: number
  onChange: (value: number) => void
  onToggleBit: (bitIndex: number) => void
  getBit: (index: number) => number
}

function ByteRow({
  index,
  value,
  onChange,
  onToggleBit,
  getBit,
}: ByteRowProps) {
  const form = useForm<ByteFormData>({
    resolver: zodResolver(byteSchema),
    defaultValues: {
      decimal: value.toString(),
      hex: value.toString(16).padStart(2, "0"),
    },
  })

  const updateForm = () => {
    form.setValue("decimal", value.toString())
    form.setValue("hex", value.toString(16).padStart(2, "0").toLowerCase())
  }

  const hasError = Object.keys(form.formState.errors).length > 0

  return (
    <div
      className={cn(
        "flex items-center space-x-2 border transition-colors",
        hasError ? "border-destructive" : "border-transparent",
      )}
    >
      <span className="font-mono text-xs">{index}:</span>

      <div className="flex -space-x-[1px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              onToggleBit(i)
              updateForm()
            }}
            className={cn(
              "aspect-square h-9 border transition-colors",
              getBit(i) === 1 ? "bg-border" : "bg-transparent",
              i === 0 ? "rounded-l-md" : "",
              i === 7 ? "rounded-r-md" : "",
            )}
            aria-label={`Toggle bit ${i}`}
          >
            <span className="text-sm">{getBit(i)}</span>
          </button>
        ))}
      </div>

      <Form {...form}>
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="hex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-12 font-mono uppercase [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="HEX"
                    maxLength={2}
                    value={field.value.padStart(2, "0")}
                    onChange={(e) => {
                      let hex = e.target.value.toLowerCase()
                      // Allow only valid hex characters
                      hex = hex.replace(/[^0-9a-f]/g, "")
                      field.onChange(hex)

                      // Only update if we have a valid hex value
                      const parsed = parseInt(hex, 16)
                      if (!isNaN(parsed)) {
                        const newValue = Math.min(255, Math.max(0, parsed))
                        onChange(newValue)
                        form.setValue("decimal", newValue.toString())
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="decimal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-14 font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="DEC"
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value)
                      if (value) {
                        const newValue = Math.min(
                          255,
                          Math.max(0, parseInt(value) || 0),
                        )
                        onChange(newValue)
                        form.setValue("decimal", newValue.toString())
                        form.setValue(
                          "hex",
                          newValue.toString(16).padStart(2, "0"),
                        )
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  )
}
