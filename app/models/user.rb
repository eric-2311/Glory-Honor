class User < ApplicationRecord
    
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :username, presense: true, uniqueness: true
    validates :session_token, presense: true, uniqueness: true

    attr_reader :password
    
    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def reset_session_token!
        self.update!(session_token: self.class.generate_session_token)
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        encrypted = BCrypt::Password.new(self.password_digest)
        encrypted.is_password(password)
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user && user.is_password?(password)
        user
    end

end