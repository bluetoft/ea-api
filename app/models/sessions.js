module.exports = {
  'Question':{
    'questionId': 'Question',
    'required': ['questionId', 'question'],
    'properties': {
      'questionId': {
        'type':'integer',
        'format': 'int64',
        'description': 'Question unique identifier',
        'minimum': '0.0',
        'maximum': '100.0'
      },
      'question': {
        'type':'string',
        'description': 'Challenge Question'
      },
      'answer': {
        'type':'string',
        'description': 'Challenge Question Answer'
      }
    }
  }
};