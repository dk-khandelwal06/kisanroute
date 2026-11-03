"""
Pytest configuration for KisanRoute.
Sets test environment flags to ensure test isolation and fast execution.
"""

import os
os.environ["TESTING"] = "1"
os.environ["ENV"] = "test"
