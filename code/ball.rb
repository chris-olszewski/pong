class Ball < Object
	attr_accessor :radius

	COLOR = C['#FFFFFF']
	START_SPEED = 60

	def initialize(args)
		super

		@size = V[20, 20]
		@radius = @size.x / 2
		@direction = V[3, 1]
	end
	
	def update(elapsed, game)
		move(elapsed, game)
		bounce(game.display, game)
		collide(game)
	end

	def move(elapsed, game)
		@position += @direction * (START_SPEED + game.score * 10) * elapsed
	end

	def bounce(display, game)
		if @position.y < @radius || @position.y + @radius > display.size.y
			@direction.y *= -1
			@position.y = [[@position.y, @radius].max, display.size.y].min
			game.reset_score
		end

		if @position.x < @radius || @position.x + @radius > display.size.x
			@direction.x *= -1
			@position.x = [[@position.x, @radius].max, display.size.x].min
		end
	end

	def collide(game)
		game.objects.each do |obj|
			if obj.respond_to?(:touching?) && obj.class == Paddle && obj.touching?(@position, @size)
				@position.y = [[@position.y, @radius + 16].max, game.display.height - 16 - @radius].min
				game.score += 1
				@direction.y *= -1
			end
		end
	end

	def draw(d)
		d.fill_color = COLOR

		d.push
			d.translate @position
			d.translate -@size / 2

			d.fill_ellipse(@size / 2, @size / 2)
		d.pop
	end
end