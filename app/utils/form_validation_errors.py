def form_validation_errors(err):
    errors = {}
    for field in err:
        for error in err[field]:
            errors[field]= error
    return errors