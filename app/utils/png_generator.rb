class PngGenerator
  PHANTOM_DIRECTORY = Rails.root.join("tmp", "phantom/").to_s
  PATH_TO_PHANTOM_SCRIPT = Rails.root.join("lib", "assets", "phantomtest.js").to_s

  def self.generate
    FileUtils.rm_rf(PHANTOM_DIRECTORY)
    system "phantomjs \"#{PATH_TO_PHANTOM_SCRIPT}\" \"#{PHANTOM_DIRECTORY}\""
    Zipper.zip(PHANTOM_DIRECTORY)
  end
end
