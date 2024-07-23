const ERROR = {
    SERVER_ERROR: { error: 'Internal server error'},
    FIELDS_REQUIRED: { error: 'All fields required'},
    LOGIN_EXISTS: { error: 'Current login already exists'},
    EMAIL_EXISTS: { error: 'Current email already exists'},
    REG_ERROR: { error: 'Error occupied while registration'},
    LOGIN_ERROR: { error: 'Error occupied while signing in'},
    NOTE_ADD: { error: 'Error occupied while creating note'},
    NOTE_UPD: { error: 'Error occupied while updating note'},
    NOTE_DELETE: { error: 'Error occupied while deleting note'},
    NOTE_NOTEXISTS: { error: 'Such note does not exists'},
    CATEGORY_ADD: { error: 'Error occupied while creating a new category'},
    CATEGORY_DELETE: { error: 'Error occupied while deleting a category'},
    CATEGORY_NO: { error: 'No category to delete'},
    CATEGORY_EXISTS: { error: 'Current category already exists'},
    LOGIN_OR_PASS: { error: 'Invalid login or password'},
    AUTH: { error: 'Error occupied while authorization user'},
    UNAUTH: { error: 'Unauthorized user'},
    INVALID_TOKEN: { error: 'Invalid token'},
}

module.exports = ERROR