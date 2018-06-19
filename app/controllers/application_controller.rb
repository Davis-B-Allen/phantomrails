class ApplicationController < ActionController::Base

  def hello
    render html: "hello, phantomjs!"
  end
end
