"""
Redis Service: This module provides a RedisService class that encapsulates operations for interacting with a Redis database.
It includes methods for setting, getting, and deleting key-value pairs, as well as checking the availability of the Redis server.
Additionally, it provides functionality to delete keys based on a pattern match.

Author: Jack Lee
Date: 2024-07-08
"""

import redis

class RedisService:
    def __init__(self, client=None, host='localhost', port=6379, db=0):
        if client:
            self.client = client
        else:
            self.client = redis.Redis(host=host, port=port, db=db)

    def set_value(self, key, value):
        self.client.set(key, value)

    def get_value(self, key):
        return self.client.get(key)

    def ping(self):
        try:
            return self.client.ping()
        except redis.ConnectionError:
            return "Redis server is not available"
        
    def delete_keys_with_pattern(self, pattern):
        cursor, keys = self.client.scan(match=pattern)
        while keys:
            self.client.delete(*keys)
            cursor, keys = self.client.scan(cursor=cursor, match=pattern)


def get_redis_service():
    return RedisService()

