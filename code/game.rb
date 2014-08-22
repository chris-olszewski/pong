class Pong < Game
	attr_accessor :input, :objects, :score

	BG_COLOR = C['#000000']
  COLOR = C['#FFFFFF']

	config[:display][:size] = V[600, 800]

  def setup
  	@objects = []
  	@objects << Ball.new(position: display.size / 2)
    @objects << Paddle.new(position: V[display.width / 2, display.height - 8], controls: 'mouse')
    @objects << Paddle.new(position: V[display.width / 2, 8])

  	@input = {}
    @score = 0

    display.fill_color = BG_COLOR
  end

  def ball
    @objects.select{ |obj| obj.class == Ball }.first
  end

  def reset_score
    @score = 0
  end

  def draw_score
    display.fill_color = COLOR
    display.stroke_color = COLOR
    display.stroke_width = 5
    display.font_size = 60
    display.fill_text(@score, display.size / 2)
  end

  def update(elapsed)
    display.fill_color = BG_COLOR
    display.clear

    @objects.compact.each do |o|
      o.update(elapsed, self)
      o.draw(display)
    end

    draw_score
  end
end
