require 'test_helper'

class CardsControllerTest < ActionDispatch::IntegrationTest
  test "should get generator" do
    get cards_generator_url
    assert_response :success
  end

  test "should get generated" do
    get cards_generated_url
    assert_response :success
  end

end
