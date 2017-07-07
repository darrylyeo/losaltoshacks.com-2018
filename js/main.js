// For debugging only
const X = console.log

const $ = s => document.querySelector.call(document, s)

// Canvas animation by Darryl Yeo (darryl-yeo.com)
{
	const canvas = $('#top-canvas')

	let width = canvas.clientWidth, height = canvas.clientHeight
	const resize = () => Object.assign(canvas, {width, height})
	resize()
	window.addEventListener('resize', resize)
	
	const context = canvas.getContext('2d')

	function bindMethods(object) {
		const boundMethods = {}
		for (const method in object) {
			if (typeof object[method] === 'function') {
				boundMethods[method] = object[method].bind(object)
			} else {
				boundMethods['$' + method] = v => object[method] = v
			}
		}
		return boundMethods
	}

	const {fill, fillRect, save, restore, translate, rotate, $fillStyle, $globalAlpha, $globalCompositeOperation} = bindMethods(context)
	const random = (a = -1, b = 1) => a + Math.random() * (b - a)
	const DEG = Math.PI / 180

	let mouse = {x: width / 2, y: height / 2, xPercent: 0, yPercent: 0}
	canvas.addEventListener('mousemove', e => {
		mouse.x = e.clientX
		mouse.y = e.clientY
		mouse.xPercent = mouse.x / (width / 2) - 1
		mouse.yPercent = mouse.y / (height / 2) - 1
	})
	
	const draw = () => {
		save()
			let
				hue = 204 + mouse.xPercent * 80 + random() * 1000,
				saturation = .69 + mouse.yPercent * .2,
				lightness = .49

			$fillStyle(`hsla(${hue % 360}, ${saturation * 100}%, ${lightness * 100}%, 0.5)`)
			$globalAlpha(random(0, 0.3))
			$globalCompositeOperation('source-over')
			//const compositeModes = [/*'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop',*/ 'lighter', /*'copy',*/ 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'color', 'luminosity']
			//$globalCompositeOperation(compositeModes[Math.round(random(0, compositeModes.length))])

			// Random rectangles anywhere
			save()
				translate(random(0, width), random(0, height))
				//translate(mouse.x + random() * 200, mouse.y + random() * 200)
				rotate(random() * 60 * DEG)
				for(const c of ":)"){
					fillRect(0, 0, random(-100, 100), random(-100, 100))
				}
			restore()

			// Random rectangles centered around mouse
			save()
				translate(mouse.x + random() * 100, mouse.y + random() * 100)
				rotate(random() * 60 * DEG)
				for(const c of 'sely'){
					fillRect(0, 0, random(-100, 100), random(-100, 100))
				}
			restore()
		restore()

		//$globalCompositeOperation('multiply')
		$fillStyle('rgba(255, 255, 255, 0.002)')
		fillRect(20, 20, width - 40, height - 40)
	}

	const loop = () => {
		draw()
		requestAnimationFrame(loop)
	}
	loop()
}