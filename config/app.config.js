'use strict';

module.exports = {
  port : '3000',
  
  empower: {
    hostname: 'localhost',
    basepath: '/api',
    port: 64440,
    physicians: {
      path: '/findadoctor/physicians/'
    },
    sessions: {
      postSessionsPath: '/auth/sessions/signin',
      putSessionPath: '/auth/sessions/signin',
      deleteSessionPath: '/auth/sessions/signout'
    },
    settings: {
      getUserNameChallengePath : '/settings/users/challenges/username',
      getUserPasswordChallenge : '/settings/users/challenges/password',
      getSecurityQuestionChoices : '/settings/users/securityQuestions'
    }
  }

};