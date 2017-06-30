module VideosHelper
  def get_video_type(url)
    uri = URI.parse(url)
    video_type = ""
    if !uri.host.nil? && uri.host == "www.youtube.com"
      video_type = "youtube"
    elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
      video_type = "wistia"
    end
    video_type
  end
end
