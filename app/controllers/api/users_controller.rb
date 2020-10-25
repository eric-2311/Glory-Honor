class Api::UsersController < ApplicationController

    #All users
    def index
        @users = User.all
        render json: @users 
    end

    #Finding a user by email
    def email
        #Creating a user instance vairable from params entered by user
        @user = User.find_by(email: params[:email])

        #Return a JSON object based on query
        @user ? (render json: @user) : (render json: 'null')
    end

    #Creating a new user
    def create
        #Initialize instance of entered information
        @user = User.new(user_params)

        #Login user if creation was successful, else display error messages
        if @user.save
            login(@user)
            render json: @user
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    #Permitted user params to protect users from updating sensitive model attributes
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name)
    end

end