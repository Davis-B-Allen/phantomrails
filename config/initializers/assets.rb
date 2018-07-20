# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w(
  cah/anims.js
  cah/card.js
  cah/check.js
  cah/easeljs-0.7.1.min.js
  cah/intro.js
  cah/jquery.min.js
  cah/main.js
  cah/mainContainer.js
  cah/noneBtn.js
  cah/updatePromptBtn.js
  cah/root2017-2.js
  cah/startBtn.js
  cah/surveyBox.js
  cah/TweenMax.min.js
)
