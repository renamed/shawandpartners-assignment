


module.exports = function getDependencies(dependency) {
    let dependencies = {
        userService: require("../../services/userServices"),
        userRepository: process.env.TEST ? require("../../../tests/mocks/userRepositoryMock") : require("../../repositories/userRepository")
    }

    return dependencies[dependency]
}