class Zipper

  require 'zip'

  def self.zip(path_to_folder)
    directory = path_to_folder
    zipfile_name = "cards.zip"
    zipfile = Rails.root.join("tmp/#{zipfile_name}")
    File.delete(zipfile) if File.exist?(zipfile)
    Zip::File.open(zipfile, Zip::File::CREATE) do |z|
        Dir[File.join(directory, '*')].each do |file|
          z.add(file.sub(directory, ''), file)
        end
    end
  end

end
