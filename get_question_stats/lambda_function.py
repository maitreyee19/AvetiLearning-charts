
import dbsupport.redis_support as redis;

def lambda_handler(event, context):

    return redis.get_question_status()