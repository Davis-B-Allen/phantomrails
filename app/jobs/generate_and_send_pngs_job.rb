class GenerateAndSendPngsJob < ApplicationJob
  queue_as :default

  def perform(email, details_tsv, content_tsv)
    PngGenerator.generate(email, details_tsv, content_tsv)
  end
end
