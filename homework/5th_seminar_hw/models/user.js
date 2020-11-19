module.exports = (sequelize, DataTypes) => {
    // sequelize.define('모델이름', {스키마}, {스키마 옵션})
    return sequelize.define('User', {
        // 모델의 Attributes를 정의하는 곳
        email: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        // 모델의 옵션들을 저장하는 곳
        freezeTableName: true,
        timestamps: false,
    });
};