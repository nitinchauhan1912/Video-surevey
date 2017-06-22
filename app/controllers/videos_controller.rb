class VideosController < ApplicationController
  before_action :set_video, only: [:edit, :update, :destroy]

  def index
    @videos = Video.all
  end

  def show
    @video = Video.find_by_slug(params[:slug])
    uri = URI.parse(@video.video_link)
    @video_type = ""
    if !uri.host.nil? && uri.host == "www.youtube.com"
      @video_id = @video.video_link.split("?v=").last
      @video_type = "youtube"
    elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
      @video_id = @video.video_link.split("/").last
      @video_type = "youtube"
     end 
    #debugger
  end

  # GET /videos/new
  def new
    @video = Video.new
  end

  # GET /videos/1/edit
  def edit
  end

  def create
   @video = Video.new(video_params)
    @video.slug = SecureRandom.hex
    respond_to do |format|
      if @video.save
        format.html { redirect_to video_path(slug: @video.slug), notice: 'Video was successfully created.' }
        format.json { render :show, status: :created, location: @video }
      else
        format.html { render :new }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @video.update(video_params)
        format.html { redirect_to @video, notice: 'Video was successfully updated.' }
        format.json { render :show, status: :ok, location: @video }
      else
        format.html { render :edit }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
    @video.destroy
    respond_to do |format|
      flash[:success] = "Video was successfully deleted."
      format.html { redirect_to videos_url}
      format.json { head :no_content }
    end
  end

  def share
    if params[:slug].present?
      @video = Video.find_by_slug(params[:slug])
      @interactions = @video.interactions
      uri = URI.parse(@video.video_link)
      @video_type = ""
      if !uri.host.nil? && uri.host == "www.youtube.com"
        @video_id = @video.video_link.split("?v=").last
        @video_type = "youtube"
      elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
        @video_id = @video.video_link.split("/").last
        @video_type = "wistia"
      end
    end
  end

  def embed
    if params[:slug].present?
      @video = Video.find_by_slug(params[:slug])
      @interactions = @video.interactions
      uri = URI.parse(@video.video_link)
      @video_type = ""
      if !uri.host.nil? && uri.host == "www.youtube.com"
        @video_id = @video.video_link.split("?v=").last
        @video_type = "youtube"
      elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
        @video_id = @video.video_link.split("/").last
        @video_type = "wistia"
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:slug])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_params
      params.require(:video).permit(:video_link)
    end
end
