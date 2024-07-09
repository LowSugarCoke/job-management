"""
Utils: This module provides utility functions for handling JSON serialization and deserialization of datetime objects.

Author: Jack Lee
Date: 2024-07-08
"""

import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)

def as_datetime(dct):
    for key, value in dct.items():
        try:
            dct[key] = datetime.fromisoformat(value)
        except (ValueError, TypeError):
            pass
    return dct