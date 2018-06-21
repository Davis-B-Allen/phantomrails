class GenerateAndSendPngsJob < ApplicationJob
  queue_as :default

  def perform(email, font, details_tsv, content_tsv)
    PngGenerator.generate(email, font, details_tsv, content_tsv)
  end
end
