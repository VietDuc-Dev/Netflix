CREATE TABLE Users (
    userId INT PRIMARY KEY IDENTITY(1,1),  -- Tự động tăng
    username NVARCHAR(255),                 -- Tên người dùng
    email NVARCHAR(255) NOT NULL UNIQUE,    -- Email, duy nhất
    password NVARCHAR(255) NOT NULL,        -- Mật khẩu
    salt NVARCHAR(255) NOT NULL,            -- Salt cho mật khẩu
    createdAt DATETIME DEFAULT GETDATE(),   -- Thời gian tạo
    updatedAt DATETIME DEFAULT GETDATE()    -- Thời gian cập nhật
);
CREATE TABLE Users (
    userId INT PRIMARY KEY IDENTITY(1,1),  -- Tự động tăng
    username NVARCHAR(255),                 -- Tên người dùng
    email NVARCHAR(255) NOT NULL,           -- Email
    password NVARCHAR(255) NOT NULL,        -- Mật khẩu
    salt NVARCHAR(255) NOT NULL,            -- Salt cho mật khẩu
    createdAt DATETIME DEFAULT GETDATE(),   -- Thời gian tạo
    updatedAt DATETIME DEFAULT GETDATE(),   -- Thời gian cập nhật
    CONSTRAINT UC_Email UNIQUE (email)      -- Ràng buộc UNIQUE cho cột email
);
CREATE TABLE Reviews (
    reviewId INT PRIMARY KEY IDENTITY(1,1), -- Tự động tăng
    userId INT NOT NULL,                     -- ID người dùng (khóa ngoại)
    content TEXT NOT NULL,                   -- Nội dung đánh giá
    mediaType NVARCHAR(10) CHECK (mediaType IN ('tv', 'movie')) NOT NULL, -- Kiểu phương tiện
    mediaId NVARCHAR(255) NOT NULL,          -- ID phương tiện
    mediaTitle NVARCHAR(255) NOT NULL,       -- Tiêu đề phương tiện
    mediaPoster NVARCHAR(255) NOT NULL,      -- Poster phương tiện
    createdAt DATETIME DEFAULT GETDATE(),    -- Thời gian tạo
    updatedAt DATETIME DEFAULT GETDATE(),    -- Thời gian cập nhật
    FOREIGN KEY (userId) REFERENCES Users(userId) -- Khóa ngoại liên kết với bảng Users
);
CREATE TABLE Favorite (
    favoriteId INT PRIMARY KEY IDENTITY(1,1), -- Tự động tăng
    userId INT NOT NULL,                        -- ID người dùng (khóa ngoại)
    content NVARCHAR(255) NOT NULL,             -- Nội dung yêu thích
    mediaType NVARCHAR(10) CHECK (mediaType IN ('tv', 'movie')) NOT NULL, -- Kiểu phương tiện
    mediaId INT NOT NULL,                      -- ID phương tiện
    mediaTitle NVARCHAR(255) NOT NULL,         -- Tiêu đề phương tiện
    mediaPoster NVARCHAR(255) NOT NULL,        -- Poster phương tiện
    mediaRate INT NOT NULL,                    -- Đánh giá phương tiện
    createdAt DATETIME DEFAULT GETDATE(),      -- Thời gian tạo
    updatedAt DATETIME DEFAULT GETDATE(),      -- Thời gian cập nhật
    FOREIGN KEY (userId) REFERENCES Users(userId) -- Khóa ngoại liên kết với bảng Users
);
