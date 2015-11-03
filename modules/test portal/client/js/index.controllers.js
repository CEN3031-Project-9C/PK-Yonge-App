(function () {
    'use strict';
    angular
        .module('app')
        .controller('IndexController', IndexController);
    IndexController.$inject = ['UserService', '$rootScope'];
    function IndexController(UserService, $rootScope) {
        var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        initController();
        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }
        function loadCurrentUser() {
            UserService.GetByStudentid($rootScope.globals.currentUser.studentid)
                .then(function (user) {
                    vm.user = user;
                });
        }
        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }
})();