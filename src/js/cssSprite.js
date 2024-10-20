/*!
 * DATE: 2018-01-25
 * @author: hebo
 * 115393304
 * (c) bobby169
 * https://github.com/bobby169/cssSprite
 */

/**
 * CssSprite，方便对逐帧动画（连续的sprite图片）在DOM中进行渲染，控制动画播放。
 * 实现了createjs.Sprite与createjs.SpriteSheet的API
 *
 * @options.target:String 元素的id或class
 * @options.images:Array/String，可选
 * @options.frames:Object/Array，可选，自定义每帧的X，Y，宽，高，spacing，margin
 * @options.animations:Object，可选，定义相关动作
 * @options.fps:Int，可选，动画每杪播放帧数，推荐24-60
 * @options.duration:Int，可选，动画一次循环总时间
 * @options.frameIndex:Int，可选，动画初始帧位置
 * @options.paused:Boolean，可选，是否自动播放
 * @options.loop:Number，可选，动画循环次数
 * @options.change:Function，可选，每帧执行的回调函数
 * @options.animationend:Function，可选，动画执行完的回调函数
 * @constructor
 */
 export default class CssSprite {
    constructor (options = {}) {
      this.options = Object.assign({
        target: 'body',
        images: null,
        frames: null,
        animations: null,
        fps: 30,
        paused: false,
        frameIndex: 0,
        loop: -1,
        loaded: false,
        change: false,
        animationend: false
      }, options)
  
      this._initialize()
    }
  
    _initialize () {
      const isElement = (obj) => {
        return !!(obj && obj.nodeType === 1)
      }
  
      const isObject = (source) => {
        return typeof source === 'function' || !!(source && typeof source === 'object')
      }
  
      this.target = isElement(this.options.target) ? this.options.target : document.querySelector(this.options.target)
      this.renderType = 'backgroundPosition'
      this._frameIndex = this.options.frameIndex
      this._frameWidth = 0
      this._frameHeight = 0
      this._frames = []
      this._spacing = 0
      this._margin = 0
      this._loopIndex = 0
      this.currentFrame = 0
      this._paused = this.options.paused
      if (!this.options.frames) {
        this.options.frames = Object.create(null)
      }
  
      if (this.options.loop === 0) {
        this._paused = true
      }
  
      if (this.options.frames.width) {
        this.options.frames.width = Number(this.options.frames.width)
        this.target.style.width = `${this.options.frames.width}px`
      }
  
      if (this.options.frames.height) {
        this.options.frames.height = Number(this.options.frames.height)
        this.target.style.height = `${this.options.frames.height}px`
      }
  
      if (this.options.frames.count) {
        this.options.frames.count = Number(this.options.frames.count)
      }
  
      if (isObject(this.options.frames) && !this.options.frames.width) {
        this.options.frames.width = this.target.clientWidth
      }
      if (isObject(this.options.frames) && !this.options.frames.height) {
        this.options.frames.height = this.target.clientHeight
      }
  
      if (Array.isArray(this.options.images) && this.options.images.length) {
        this.totalFrames = this.options.images.length
        this.options.images.forEach((img, index) => {
          if (img.tagName && img.tagName === 'IMG') {
            // if (index !== 0) {
            //   img.style.display = 'none'
            // }
            // this.target.appendChild(img)
            if (index === 0) {
              this._currentAppendChild = this.target.appendChild(img)
            }
            this.renderType = 'img'
          } else {
            this.renderType = 'backgroundImage'
          }
        })
        this._toTick()
      } else if (Array.isArray(this.options.frames) && this.options.frames.length) {
        this.totalFrames = this.options.frames.length
        this.options.frames.forEach((frame) => {
          if (Array.isArray(frame)) {
            const x = frame[0]
            const y = frame[1]
            const width = frame[2] ? frame[2] : this.target.clientWidth
            const height = frame[3] ? frame[3] : this.target.clientHeight
            this._frames.push({ x, y, width, height })
          } else if (!isNaN(frame.x) && !isNaN(frame.y) && !isNaN(frame.width) && !isNaN(frame.height)) {
            this._frames.push(frame)
          }
        })
        this._load(this.options.images)
      } else if (this.options.frames.width !== null && this.options.frames.height !== null) {
        this._frameWidth = this.options.frames.width
        this._frameHeight = this.options.frames.height
        this._spacing = this.options.spacing || 0
        this._margin = this.options.margin || 0
        this.totalFrames = this.options.frames.count
        if (!this.totalFrames) {
          throw new Error('totalFrames must set number and greater than 0')
        }
  
        let frameCount = 0
        const frameWidth = this._frameWidth
        const frameHeight = this._frameHeight
        const spacing = this._spacing
        const margin = this._margin
        const totalFrames = this.totalFrames
  
        if (!frameWidth || !frameHeight) {
          throw new Error('frames.width or frames.height must set number and greater than 0')
        }
  
        this._loadImage((width, height) => {
          const imgW = width
          const imgH = height
          let y = margin
          while (y <= imgH - margin - frameHeight) {
            let x = margin
            while (x <= imgW - margin - frameWidth) {
              if (frameCount >= totalFrames) {
                break
              }
              frameCount++
              this._frames.push({ x, y, width: frameWidth, height: frameHeight })
              x += frameWidth + spacing
            }
            y += frameHeight + spacing
          }
  
          if (this.totalFrames === undefined) {
            this.totalFrames = frameCount
          }
        })
      }
    }
  
    _toTick () {
      if (this._paused) {
        this.frame(0)
      } else {
        this._tick()
      }
    }
  
    _getCss (element, property) {
      const camelize = function (str) {
        return str.replace(/-+(.)?/g, function (match, chr) {
          return chr ? chr.toUpperCase() : ''
        })
      }
      return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
    }
  
    _load (src, successCallback) {
      if (typeof src !== 'string' || src.trim() === '') {
        return
      }
      const tag = document.createElement('img')
      tag.src = src
      if (tag.complete) {
        this._onLoad(tag, successCallback)
      } else {
        tag.onload = () => {
          this._onLoad(tag, successCallback)
          tag.onload = tag.onerror = null
        }
      }
    }
  
    _onLoad (tag, successCallback) {
      typeof this.options.loaded === 'function' && this.options.loaded.call(this, tag)
      typeof successCallback === 'function' && successCallback.call(this, tag)
      if (typeof this.options.images === 'string') {
        this.target.style.backgroundImage = `url(${tag.src})`
      }
      this._toTick()
    }
  
    _loadImage (callback) {
      let imageSrc
      if (typeof this.options.images === 'string') {
        imageSrc = this.options.images
      } else {
        imageSrc = this._getCss(this.target, 'background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2')
      }
  
      this._load(imageSrc, (tag) => {
        callback(tag.naturalWidth, tag.naturalWidth)
      })
    }
  
    _getFrameIndex () {
      return this._frameIndex
    }
  
    _setFrameIndex (frameIndex) {
      const total = this.options.animations ? this.currentAnimation.length : this.totalFrames
      frameIndex = frameIndex > total - 1 ? 0 : frameIndex
      frameIndex = frameIndex < 0 ? total - 1 : frameIndex
      this._frameIndex = frameIndex
    }
  
    _checkLoop (frameIndex, finalFrame) {
      frameIndex++
      if (frameIndex >= finalFrame) {
        frameIndex = 0
        if (this.currentAnimation && this.currentAnimation.next) {
          this.currentAnimation = this.options.animations[this.currentAnimation.next]
          this._tick()
        } else if (this.options.loop === -1) {
          this._tick()
        } else if (this.options.loop > 0 && this._loopIndex < this.options.loop - 1) {
          this._loopIndex++
          this._tick()
        } else {
            typeof this.options.animationend === 'function' && this.options.animationend.call(this)
        }
      } else {
        this._tick()
      }
      return frameIndex
    }
  
    _animation () {
      if (!this.options.animations) {
        this.frame(this._frameIndex)
        this._frameIndex = this._checkLoop(this._frameIndex, this.totalFrames)
      } else {
        if (this.currentAnimation === undefined) {
          for (const k in this.options.animations) {
            this.currentAnimation = this.options.animations[k]
            break
          }
        }
  
        if (Array.isArray(this.currentAnimation)) {
          this.frame(this.currentAnimation[this._frameIndex])
          this._frameIndex = this._checkLoop(this._frameIndex, this.currentAnimation.length)
        } else {
          if (this.currentAnimation.frames && this.currentAnimation.frames.length) {
            this.frame(this.currentAnimation.frames[this._frameIndex])
            this._frameIndex = this._checkLoop(this._frameIndex, this.currentAnimation.frames.length)
          }
        }
      }
    }
  
    _tick () {
      let speed = 1000 / this.options.fps
  
      if (this.currentAnimation && this.currentAnimation.speed) {
        speed = speed / this.currentAnimation.speed
      }
  
      if (this.options.duration !== undefined) {
        speed = this.options.duration / this.totalFrames
      }
  
      // 清除this._interval，防止重复_tick
      if (this._interval) clearTimeout(this._interval)
  
      this._interval = setTimeout(() => {
        this._animation()
      }, speed)
    }
  
    _goto (frameIndexOrAnimation) {
      this.stop()
      this._loopIndex = 0
      if (typeof frameIndexOrAnimation === 'string') {
        if (this.options.animations[frameIndexOrAnimation] !== this.currentAnimation) {
          this._frameIndex = 0
          this.currentAnimation = this.options.animations[frameIndexOrAnimation]
          this.currentAnimationName = frameIndexOrAnimation
        }
        this._tick()
      } else if (typeof frameIndexOrAnimation === 'number') {
        this._frameIndex = frameIndexOrAnimation
        this._tick()
      } else if (frameIndexOrAnimation === undefined) {
        this._frameIndex = 0
        this._tick()
      }
    }
  
    _setPaused (val) {
      this._paused = val
      if (this._paused) {
        this.stop()
      } else {
        this.play()
      }
    }
  
    /**
     * 播放头直接停在某帧，不常用。推荐使用gotoAndStop(frameIndexOrAnimation)方法
     * @param currentFrame:Number，实际图片每帧的顺序编号
     */
    frame (currentFrame) {
      const $target = this.target
      if (typeof currentFrame === 'undefined' || isNaN(currentFrame)) {
        currentFrame = this.currentFrame
      }
  
      if (this.renderType === 'backgroundImage') {
        $target.style.backgroundImage = this.options.images[currentFrame].img ? `url(${this.options.images[currentFrame].img})` : `url(${this.options.images[currentFrame]})`
      } else if (this.renderType === 'img') {
        // this.options.images.forEach(function (img, index) {
        //   if (index === currentFrame) {
        //     img.style.display = 'inline-block'
        //   } else {
        //     img.style.display = 'none'
        //   }
        // })
        if (this._currentAppendChild) {
          $target.removeChild(this._currentAppendChild)
        }
        this._currentAppendChild = $target.appendChild(this.options.images[currentFrame])
      } else {
        if (!this._frames.length) {
          console.warn('this._frames.length is 0!')
          return
        }
        $target.style.backgroundPosition = (-this._frames[currentFrame].x) + 'px ' + (-this._frames[currentFrame].y) + 'px'
        $target.style.width = `${this._frames[currentFrame].width}px`
        $target.style.height = `${this._frames[currentFrame].height}px`
      }
  
      // 和createjs.Sprite的this.currentFrame保持一致
      this.currentFrame = currentFrame
  
      typeof this.options.change === 'function' && this.options.change.apply(this, [currentFrame, this._frameIndex])
    }
  
    /**
     * 跳到某帧并播放
     * @param frameOrAnimation:Number/String
     */
    gotoAndPlay (frameIndexOrAnimation) {
      this._goto(frameIndexOrAnimation)
    }
  
    /**
     * 跳到某帧停止播放
     * 如果你不想内部的计时器，如自定义缓动播放某帧，非常有用
     * @param frameIndexOrAnimation:Number/String
     */
    gotoAndStop (frameIndexOrAnimation) {
      this.stop()
      if (typeof frameIndexOrAnimation === 'undefined') {
        frameIndexOrAnimation = this._frameIndex
      }
  
      if (typeof frameIndexOrAnimation === 'string') {
        this._frameIndex = 0
        this.currentAnimation = this.options.animations[frameIndexOrAnimation]
        this.currentAnimationName = frameIndexOrAnimation
        this.frame(this.currentAnimation[this._frameIndex])
      } else if (this.options.animations) {
        this.frame(this.currentAnimation[frameIndexOrAnimation])
      } else {
        this._frameIndex = frameIndexOrAnimation
        this.frame(this._frameIndex)
      }
    }
  
    /**
     * 和gotoAndPlay一样，这个更多的是不传参数，恢复播放功能
     * @param frameOrAnimation
     */
    play (frameIndexOrAnimation) {
      this._goto(frameIndexOrAnimation)
    }
  
    /**
     * 停止播放
     */
    stop () {
      clearTimeout(this._interval)
    }
  
    /**
     * 动态更新帧频,如fps = 10，则每秒播放10帧
     * @param fps:Number
     */
    fps (fps) {
      this.options.fps = fps
    }
  }
  
  /**
   * 可以直接读写frameIndex属性，比如
   * let sprite = new CssSprite()
   * sprite.frameIndex++ //重置frameIndex
   * sprite.gotoAndPlay(sprite.frameIndex)
   */
  try {
    Object.defineProperties(CssSprite.prototype, {
      frameIndex: { set: CssSprite.prototype._setFrameIndex, get: CssSprite.prototype._getFrameIndex },
      paused: { set: CssSprite.prototype._setPaused, get: CssSprite.prototype._paused }
    })
  } catch (e) {
  }
  
  /**
   * 快速生成开始与结束的连续动画数组
   * @param begin:Int
   * @param end:Int
   * @returns {Array}
   */
  CssSprite.createAnimations = function (begin, end) {
    const arr = []
    while (end - begin >= 0) {
      arr.push(begin)
      begin++
    }
    return arr
  }