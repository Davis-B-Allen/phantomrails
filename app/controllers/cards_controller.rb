class CardsController < ApplicationController

  def generator
  end

  def generated
    PngGenerator.generate
    redirect_to '/cards/generator'
  end
end
