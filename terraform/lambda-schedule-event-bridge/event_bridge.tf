resource "aws_cloudwatch_event_rule" "profile_generator_lambda_event_rule" {
  name                = "profile-generator-lambda-event-rule"
  description         = "retry scheduled every 2 min"
  schedule_expression = "rate(2 minutes)"
}

resource "aws_cloudwatch_event_target" "profile_generator_lambda_target" {
  arn  = module.profile_generator_lambda.lambda_function_arn
  rule = aws_cloudwatch_event_rule.profile_generator_lambda_event_rule.name
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_rw_fallout_retry_step_deletion_lambda" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = module.profile_generator_lambda.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.profile_generator_lambda_event_rule.arn
}