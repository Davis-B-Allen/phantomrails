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

  PATH_TO_PHANTOM_SCRIPT_MONOLINGUAL = Rails.root.join("lib", "assets", "cardgen", "cardgen.js").to_s
  PATH_TO_INPUT_HTML_MONOLINGUAL = Rails.root.join("lib", "assets", "cardgen", "input", "html", "cardExportTest.html").to_s

  PATH_TO_PHANTOM_SCRIPT_BILINGUAL = Rails.root.join("lib", "assets", "cardgen", "bigen.js").to_s
  PATH_TO_INPUT_HTML_BILINGUAL = Rails.root.join("lib", "assets", "cardgen", "input", "html", "cardBilingual.html").to_s

  def self.generate(email, font, details_tsv, content_tsv, bi_content_tsv)
    phantom_directory = PHANTOM_DIRECTORY
    if bi_content_tsv.nil?
      puts "**************************** SINGLE LANGUAGE CARDS ****************************"
      script_path = PATH_TO_PHANTOM_SCRIPT_MONOLINGUAL
      input_html_path = PATH_TO_INPUT_HTML_MONOLINGUAL
    else
      puts "**************************** BILINGUAL CARDS ****************************"
      script_path = PATH_TO_PHANTOM_SCRIPT_BILINGUAL
      input_html_path = PATH_TO_INPUT_HTML_BILINGUAL
    end
    FileUtils.rm_rf(phantom_directory)
    command_to_execute = "phantomjs \"#{script_path}\""
    command_to_execute += " --tsvdetails \"#{details_tsv}\""
    command_to_execute += " --tsvcontent \"#{content_tsv}\""
    unless bi_content_tsv.nil?
      command_to_execute += " --tsvcontent2 \"#{bi_content_tsv}\""
    end
    command_to_execute += " --localalt \"#{input_html_path}\""
    command_to_execute += " --bleed true"
    command_to_execute += " --topic DisplayTopic"
    command_to_execute += " --text DisplayText"
    command_to_execute += " --outputfolder \"#{phantom_directory}\""
    command_to_execute += " --font \"#{font}\""
    puts command_to_execute

    system command_to_execute
    File.delete(details_tsv) if File.exist?(details_tsv)
    File.delete(content_tsv) if File.exist?(content_tsv)
    unless bi_content_tsv.nil?
      File.delete(bi_content_tsv) if File.exist?(bi_content_tsv)
    end
    zipfile_name = "cards.zip"
    zipfile = Rails.root.join("tmp/#{zipfile_name}")
    Zipper.zip(PHANTOM_DIRECTORY, zipfile_name, zipfile)
    FileUtils.rm_rf(PHANTOM_DIRECTORY)
    ZipMailer.send_zip(email, zipfile_name, zipfile).deliver_now unless email.empty?
  end
end
