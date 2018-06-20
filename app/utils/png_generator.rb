class PngGenerator
  # PHANTOM_DIRECTORY = Rails.root.join("tmp", "phantom/").to_s
  # PATH_TO_PHANTOM_SCRIPT = Rails.root.join("lib", "assets", "phantomtest.js").to_s
  #
  # def self.generate(email, details_tsv, content_tsv)
  #   FileUtils.rm_rf(PHANTOM_DIRECTORY)
  #   system "phantomjs \"#{PATH_TO_PHANTOM_SCRIPT}\" \"#{PHANTOM_DIRECTORY}\" \"#{details_tsv}\" \"#{content_tsv}\""
  #   zipfile_name = "cards.zip"
  #   zipfile = Rails.root.join("tmp/#{zipfile_name}")
  #   Zipper.zip(PHANTOM_DIRECTORY, zipfile_name, zipfile)
  #   ZipMailer.send_zip(email, zipfile_name, zipfile).deliver_now unless email.empty?
  # end
  PHANTOM_DIRECTORY = Rails.root.join("tmp", "phantom/").to_s
  PATH_TO_PHANTOM_SCRIPT = Rails.root.join("lib", "assets", "cardgen", "cardgen.js").to_s
  PATH_TO_INPUT_HTML = Rails.root.join("lib", "assets", "cardgen", "input", "html", "cardExportTest.html").to_s

  def self.generate(email, details_tsv, content_tsv)
    FileUtils.rm_rf(PHANTOM_DIRECTORY)
    command_to_execute = "phantomjs \"#{PATH_TO_PHANTOM_SCRIPT}\""
    command_to_execute += " --tsvdetails \"#{details_tsv}\""
    command_to_execute += " --tsvcontent \"#{content_tsv}\""
    command_to_execute += " --localalt \"#{PATH_TO_INPUT_HTML}\""
    command_to_execute += " --bleed true"
    command_to_execute += " --topic DisplayTopic"
    command_to_execute += " --text DisplayText"
    command_to_execute += " --outputfolder \"#{PHANTOM_DIRECTORY}\""
    command_to_execute += " --font segoe"

    system command_to_execute
    File.delete(details_tsv) if File.exist?(details_tsv)
    File.delete(content_tsv) if File.exist?(content_tsv)
    zipfile_name = "cards.zip"
    zipfile = Rails.root.join("tmp/#{zipfile_name}")
    Zipper.zip(PHANTOM_DIRECTORY, zipfile_name, zipfile)
    FileUtils.rm_rf(PHANTOM_DIRECTORY)
    ZipMailer.send_zip(email, zipfile_name, zipfile).deliver_now unless email.empty?
  end
end
