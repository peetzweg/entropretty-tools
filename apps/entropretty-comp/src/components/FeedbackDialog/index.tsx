import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { MessageCircle, Frown, Meh, Smile, Loader2 } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const feedbackSchema = z.object({
  feedback: z.string().min(1, "Please provide some feedback"),
  sentiment: z.enum(["negative", "neutral", "positive"], {
    required_error: "Please select a sentiment",
  }),
})

type FeedbackForm = z.infer<typeof feedbackSchema>

const sentimentToNumber = {
  negative: -1,
  neutral: 0,
  positive: 1,
} as const

export function FeedbackDialog() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      sentiment: "neutral",
    },
  })

  const submitFeedback = useMutation({
    mutationFn: async (data: FeedbackForm) => {
      if (!user) throw new Error("You must be logged in to submit feedback")

      const { error } = await supabase.from("feedback").insert({
        content: data.feedback,
        sentiment: sentimentToNumber[data.sentiment],
        user_id: user.id,
      })

      if (error) throw error
    },
    onSuccess: () => {
      toast.success("Thank you for your feedback!")
      form.reset()
      setOpen(false)
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit feedback: ${error.message}`)
    },
  })

  const onSubmit = (data: FeedbackForm) => {
    submitFeedback.mutate(data)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">FEEDBACK</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-none p-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Leave Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            We'd love to hear what went well or how we can improve entropretty.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="sentiment"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      {[
                        { value: "negative", icon: Frown },
                        { value: "neutral", icon: Meh },
                        { value: "positive", icon: Smile },
                      ].map(({ value, icon: Icon }) => (
                        <FormControl key={value}>
                          <Button
                            type="button"
                            variant={
                              field.value === value ? "outline" : "ghost"
                            }
                            size="icon"
                            className={cn(
                              field.value === value && "border-primary",
                            )}
                            onClick={() => field.onChange(value)}
                          >
                            <Icon className="h-4 w-4" />
                          </Button>
                        </FormControl>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <Button type="submit" disabled={submitFeedback.isPending}>
                  {submitFeedback.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
