class VideosController < ApplicationController
  before_action :set_video, only: [:edit, :update, :destroy]
  before_action :check_authentication, except: [:share,:embed,:video_response_answer]
  before_action :reset_video_response_id, only: [:share,:embed]

  
  def index
    @videos = Video.where(user_id: current_user.id)
  end

  def show
    @video = Video.find_by_slug(params[:slug])
    if(@video.user_id == current_user.id)
      
      if @video.video_type == "youtube"
        @video_id = @video.video_link.split("?v=").last
      else
        @video_id = @video.video_link.split("/").last
       end
    else
      respond_to do |format|
        flash[:warning] = "Unauthorize access"
        format.html { redirect_to videos_url}
      end
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
    @video.user_id = current_user.id
    video_type = get_video_type_throug_url(params["video"]["video_link"])
    @error = false
    @video.video_type = video_type
    @error = true if(!video_type.present?)
    respond_to do |format|
      if !@error && @video.valid_url && @video.save
        #flash[:success] = "Video was successfully created."
        format.html { redirect_to video_path(slug: @video.slug)}
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
        flash[:success] = "Video was successfully update."
        format.html { redirect_to @video }
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
    if(@video.user_id == current_user.id)
      @video.destroy
      flash[:success] = "Video was successfully deleted."
    else
      flash[:warning] = "Unauthorize access"
    end 
    respond_to do |format|
      format.html { redirect_to videos_url}
      format.json { head :no_content }
    end
  end

  def share
    if params[:slug].present?
      @video = Video.find_by_slug(params[:slug])
      @interactions = @video.interactions
      if @video.video_type == "youtube"
        @video_id = @video.video_link.split("?v=").last
      else
        @video_id = @video.video_link.split("/").last
       end
    end
  end

  def embed
    if params[:slug].present?
      @video = Video.find_by_slug(params[:slug])
      @interactions = @video.interactions
      if @video.video_type == "youtube"
        @video_id = @video.video_link.split("?v=").last
      else
        @video_id = @video.video_link.split("/").last
       end
    end
  end
  
  def video_response_answer
    
  end
  
  private
  
    def get_video_type_throug_url(video_url)
      uri = URI.parse(video_url)
      video_type = ""
      if !uri.host.nil? && uri.host == "www.youtube.com"
        video_type = "youtube"
      elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
        video_type = "wistia"
      end
      video_type
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find_by_slug(params[:slug])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_params
      params.require(:video).permit(:video_link, :user_id)
    end
    
    def check_authentication
      if !current_user
        flash[:warning] = "Your are not authorize to view any content until you sign in."
        redirect_to '/'
      end  
    end
    
    def reset_video_response_id
      session[:response_id] = nil
    end
end
