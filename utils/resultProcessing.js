const createResult = (error, data) => {
    if (data) {
        return createSuccessResult(data)
    } else {
        return createErrorResult(error)
    }
}

const createErrorResult = (error) => {
    return { status: 'error', error: error }
}

const createSuccessResult = (data) => {
    return { status: 'success', data: data }
}

module.exports = { createResult, createErrorResult, createSuccessResult }