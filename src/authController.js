const bcrypt = require('bcryptjs');
const userStorage = require('./userStorage');

const login = async (req, res) => {
    try {
        // 获取用户名和密码
        const { username, password } = req.body;
        // 判断是否存在
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await userStorage.getUser('username', username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // 返回的信息和数据
        res.json({
            code: 200,
            message: '登录成功',
            ok: true,
            data: user.token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { token } = req.headers
        // if(!token){
        //     return res.status(401).json({ message: 'token 过期' });
        // }
        const user = await userStorage.getUser('token', token);
        if (!user) {
            return res.status(401).json({ message: 'token 过期' });
        }
        const { username, roles, routes, buttons, avatar } = user
        res.json({
            code: 200,
            message: 'Login successful',
            ok: true,
            data: { avatar, name: username, roles, buttons, routes }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const register = async (req, res) => {
    try {
        let userObj = req.body
        const { username, password } = userObj;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await userStorage.getUser(username);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        userObj.password = hashedPassword
        await userStorage.createUser(userObj);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    login,
    register,
    getUserInfo
};