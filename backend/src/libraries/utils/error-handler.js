/**
 * Custom error handling for different scenarios
 * @author Valeria Molina Recinos
 */
class BrandNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandNotFoundError';
        this.statusCode = 404; // not f
    }
}

class BrandAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class PolishAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
        this.statusCode = 404; // not found
    }
}

class RoleNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RoleNotFoundError';
        this.statusCode = 404; // not found
    }
}

class UserRoleDoesNotExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserRoleDoesNotExist';
        this.statusCode = 404; // not found
    }
}

class SequelizeValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SequelizeValidationError';
        this.statusCode = 400; // bad request
    }
}

class UserAlreadyHasRoleError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyHasRoleError';
        this.statusCode = 400; // bad request
    }
}

class NoMatchesFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoMatchesFoundError';
        this.statusCode = 200; // not found
    }
}

class UserAlreadySubmittedDupeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadySubmittedDupeError';
        this.statusCode = 400; // bad request
    }
}

class DupeAlreadySubmitterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DupeAlreadySubmitterError';
        this.statusCode = 400; // bad request
    }
}

class UserAlreadySubmittedPolishError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadySubmittedPolishError';
        this.statusCode = 400; // bad request
    }
}

class PolishAlreadySubmittedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishAlreadySubmittedError';
        this.statusCode = 400; // bad request
    }
}

class PolishSubmissionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishSubmissionError';
        this.statusCode = 400; // bad request
    }
}

class DupeSubmissionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DupeSubmissionError';
        this.statusCode = 400; // bad request
    }
}

class UserAlreadySubmittedBrandError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadySubmittedBrandError';
        this.statusCode = 400; // bad request
    }
}

class BrandAlreadySubmittedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandAlreadySubmittedError';
        this.statusCode = 400; // bad request
    }
}

class BrandSubmissionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandSubmissionError';
        this.statusCode = 400; // bad request
    }
}

class BrandSubmissionNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandSubmissionNotFoundError';
        this.statusCode = 404; // not found
    }
}

class PolishSubmissionNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishSubmissionNotFoundError';
        this.statusCode = 404; // not found
    }
}

class PolishSubmissionUpdateStatusError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishSubmissionUpdateStatusError';
        this.statusCode = 400; // bad request
    }
}

class BrandSubmissionUpdateStatusError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrandSubmissionUpdateStatusError';
        this.statusCode = 400; // bad request
    }
}

class DupeSubmissionNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DupeSubmissionNotFoundError';
        this.statusCode = 404; // not found
    }
}

class DupeSubmissionUpdateStatusError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DupeSubmissionUpdateStatusError';
        this.statusCode = 400; // bad request
    }
}

class PolishNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolishNotFoundError';
        this.statusCode = 404; // not found
    }
}

class SearchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SearchError';
        this.statusCode = 400; // bad request
    }
}

class FormulaAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FormulaAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class ColorAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ColorAlreadyExistsError';
        this.statusCode = 400; // conflict
    }
}

class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentialsError';
        this.statusCode = 401; // unauthorized
    }
}

class UserNameAlreadyInUseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNameAlreadyInUseError';
        this.statusCode = 409; // conflict
    }
}

class EmailAlreadyInUseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyInUseError';
        this.statusCode = 409; // conflict
    }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTokenError';
        this.statusCode = 401; // unauthorized
    }
}

class UserAlreadyVerifiedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyVerifiedError';
        this.statusCode = 400; // bad request
    }
}

class UserNotVerifiedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotVerifiedError';
        this.statusCode = 400; // bad request
    }
}

class JsonWebTokenVerifyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JsonWebTokenError';
        this.statusCode = 401; // unauthorized
    }
}

class UserLikeAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserLikeAlreadyExistsError';
        this.statusCode = 400; // bad request
    }
}

class UserLikeDoesNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserLikeDoesNotExistError';
        this.statusCode = 404; // not found
    }
}

module.exports = {
    UserAlreadyVerifiedError,
    InvalidTokenError,
    BrandNotFoundError,
    PolishAlreadyExistsError,
    BrandAlreadyExistsError,
    UserNotFoundError,
    RoleNotFoundError,
    UserRoleDoesNotExist,
    SequelizeValidationError,
    UserAlreadyHasRoleError,
    NoMatchesFoundError,
    UserAlreadySubmittedDupeError,
    DupeAlreadySubmitterError,
    DupeSubmissionError,
    UserAlreadySubmittedPolishError,
    PolishAlreadySubmittedError,
    UserAlreadySubmittedBrandError,
    BrandAlreadySubmittedError,
    BrandSubmissionError,
    PolishSubmissionError,
    PolishSubmissionNotFoundError,
    PolishSubmissionUpdateStatusError,
    BrandSubmissionNotFoundError,
    BrandSubmissionUpdateStatusError,
    DupeSubmissionNotFoundError,
    DupeSubmissionUpdateStatusError,
    PolishNotFoundError,
    SearchError,
    FormulaAlreadyExistsError,
    ColorAlreadyExistsError,
    InvalidCredentialsError,
    EmailAlreadyInUseError,
    UserNameAlreadyInUseError,
    UserNotVerifiedError,
    JsonWebTokenVerifyError,
    UserLikeAlreadyExistsError,
    UserLikeDoesNotExistError,
};
