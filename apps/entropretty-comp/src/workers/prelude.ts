export const preludeScript = `
      var black = "#000000"
      var white = "#fff"
      var light = "#aaa"
      var dark = "#666"

      function split(seed, parts) {
        let r = []
        let last = 0
        for (let i = 0; i < parts; ++i) {
          let next = Math.round(((i + 1) * 32) / parts)
          r.push(bits(seed, last, next))
          last = next
        }
        return r
      }

      function bytesToNibbles(bytes) {
        const nibbles = []
        for (let i = 0; i < bytes.length; i++) {
          nibbles.push((bytes[i] >> 4) & 15)
          nibbles.push(bytes[i] & 15)
        }
        return nibbles
      }

      function bit(seed, i) {
        return (seed[Math.floor(i / 8) % seed.length] >> i % 8) & 1
      }

      function bits(seed, from = 0, to = 32) {
        let r = 0
        for (let i = from; i < to; ++i) {
          r = ((r << 1) | bit(seed, i)) >>> 0
        }
        return r
      }

      function symmetrical(factor, fn, ctx) {
        ctx.translate(50, 50)
        ctx.scale(50, 50)
        for (let i = 0; i < factor; ++i) {
          ctx.save()
          ctx.rotate((Math.PI * 2 * i) / factor)
          fn(i)
          ctx.restore()
        }
      }

      function strokeEach(array, fn, ctx) {
        array.forEach((element, index) => {
          ctx.beginPath()
          fn(element, index)
          ctx.stroke()
        })
      }

      function fillEach(array, fn, ctx) {
        array.forEach((element, index) => {
          ctx.beginPath()
          fn(element, index)
          ctx.fill()
        })
      }

      function numeric(seed) {
        const MAX_BYTES = 64
        if (seed.length > MAX_BYTES) {
          throw "Seed too long to safely convert to a bigint"
        }
        let result = 0n
        for (let i = 0; i < seed.length; i++) {
          result = (result << 8n) | BigInt(seed[i])
        }
        return result
      }

      function randomGenerator(seed) {
        let a = bits(seed)
        let b = bits(seed)
        let c = bits(seed)
        let d = bits(seed)
        return function () {
          var t = (a + b) | 0
          a = b ^ (b >>> 9)
          b = (c + (c << 3)) | 0
          c = (c << 21) | (c >>> 11)
          d = (d + 1) | 0
          t = (t + d) | 0
          c = (c + t) | 0
          return (t >>> 0) / 4294967296
        }
      }

      function sfc32(a, b, c, d) {
        return function () {
          a |= 0
          b |= 0
          c |= 0
          d |= 0
          const t = (((a + b) | 0) + d) | 0
          d = (d + 1) | 0
          a = b ^ (b >>> 9)
          b = (c + (c << 3)) | 0
          c = (c << 21) | (c >>> 11)
          c = (c + t) | 0
          return (t >>> 0) / 4294967296
        }
      }
    `
