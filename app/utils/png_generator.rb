class PngGenerator
  PHANTOM_DIRECTORY = Rails.root.join("tmp", "phantom/").to_s
  PATH_TO_PHANTOM_SCRIPT = Rails.root.join("lib", "assets", "phantomtest.js").to_s

  def self.generate(email)
    FileUtils.rm_rf(PHANTOM_DIRECTORY)
    system "phantomjs \"#{PATH_TO_PHANTOM_SCRIPT}\" \"#{PHANTOM_DIRECTORY}\""
    zipfile_name = "cards.zip"
    zipfile = Rails.root.join("tmp/#{zipfile_name}")
    Zipper.zip(PHANTOM_DIRECTORY, zipfile_name, zipfile)
    ZipMailer.send_zip(email, zipfile_name, zipfile).deliver_now unless email.empty?
  end
end
