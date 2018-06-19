class CardsController < ApplicationController

  def generator
  end

  def generated
    email = params["email"]
    PngGenerator.generate(email)
    redirect_to '/cards/generator'
  end
end
