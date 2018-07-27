class CardsController < ApplicationController

  def generator
  end

  def generated
    email = params["email"]
    details_tsv = params["details_tsv"]
    content_tsv = params["content_tsv"]
    bi_content_tsv = params["bi_content_tsv"]
    font = params["font"]

    details_tsv_tmpfile = Rails.root.join('tmp', details_tsv.original_filename).to_s
    content_tsv_tmpfile = Rails.root.join('tmp', content_tsv.original_filename).to_s

    File.open(details_tsv_tmpfile, 'wb') do |file|
      file.write(details_tsv.read)
    end
    File.open(content_tsv_tmpfile, 'wb') do |file|
      file.write(content_tsv.read)
    end

    if bi_content_tsv.nil?
      bi_content_tsv_tmpfile = nil
    else
      bi_content_tsv_tmpfile = Rails.root.join('tmp', bi_content_tsv.original_filename).to_s
      File.open(bi_content_tsv_tmpfile, 'wb') do |file|
        file.write(bi_content_tsv.read)
      end
    end

    # PngGenerator.generate(email, font, details_tsv_tmpfile, content_tsv_tmpfile)

    # Note that the temp storage for the uploaded files details_tsv and content_tsv will be unreliable in deployment
    # Perhaps upload these immediately to S3 then the background job processes assets from S3
    GenerateAndSendPngsJob.set(wait: 5.seconds).perform_later(email, font, details_tsv_tmpfile, content_tsv_tmpfile, bi_content_tsv_tmpfile)
    flash[:success] = "Your generated images will be emailed to the address you provided"

    redirect_to '/cards/generator'
  end

  def lab
    render layout: false
  end

  def playtest
    puts params
    head :ok
  end
end
