class Api::SessionsController < ApplicationController

    #Creating a new user session
    def create
        #Initialize an instance of users from entered params
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )

        if @user
            #If a user is found, render show page and login user
            login(@user)
            render '/api/users/show'
        else
            #Return error if user is not found
            render json: ['Invalid credentials'], status: 422
        end
    end

    #Logging out
    def destroy
        if current_user
            #Logs out a user and return an empty JSON object
            logout
            render json: {}
        else
            #Render error since there is no user to logout
            render json: '404 Error'
        end
    end
    
end