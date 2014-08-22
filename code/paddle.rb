class Paddle < Object
	COLOR = C['#FFFFFF']
	MOVE_SPEED = 5
	MAX_SPEED = 20

	def initialize(args)
		super

		@size = V[128, 16]
		@controls = args.fetch(:controls, 'ai')
		@velocity = V[0, 0]
	end

	def touching?(position, size)
		obj_box = [position - size / 2, position + size / 2]
		obj_x = (obj_box.first.x.to_i..obj_box.last.x.to_i).to_a
		obj_y = (obj_box.first.y.to_i..obj_box.last.y.to_i).to_a
		my_box = [@position - @size / 2, @position + @size / 2]
		my_x = (my_box.first.x.to_i..my_box.last.x.to_i).to_a
		my_y = (my_box.first.y.to_i..my_box.last.y.to_i).to_a
		!(obj_x & my_x).empty? && !(obj_y & my_y).empty?
	end
	
	def update(elapsed, game)
		move(elapsed, game)
	end

	def move(elapsed, game)
		if @controls == 'mouse'
			@position.x = game.mouse.position.x if game.mouse.position
		else
			@position.x = game.ball.position.x
		end
		@position.x = [[@position.x, 0 + @size.x / 2].max, game.display.width - @size.x / 2].min
	end

	def draw(d)
		d.fill_color = COLOR

		d.push
			d.translate @position
			d.translate -@size / 2

			d.begin_shape
				d.move_to V[0, 0]
				d.line_to V[@size.x, 0]
				d.line_to V[@size.x, @size.y]
				d.line_to V[0, @size.y]
				d.line_to V[0, 0]
			d.end_shape
			d.fill_shape
		d.pop
	end
end