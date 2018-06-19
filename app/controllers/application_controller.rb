class ApplicationController < ActionController::Base

  def hello
    render html: "hello, phantomjs!"
  end

  def cardgen
    output_folder = Rails.root.join("tmp", "phantom/").to_s
    phantomjs_script = Rails.root.join("lib", "assets", "phantomtest.js").to_s
    system "phantomjs \"#{phantomjs_script}\" \"#{output_folder}\""
    puts "************** DONE ***************"
    render html: "CARDGEN"
  end
end
