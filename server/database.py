import sqlite3
from typing import Optional, List


class Database:
    """Database class"""

    def __init__(self, db_name: str) -> None:
        """
        Initialize the database
        :param db_name: str
        """
        if not db_name.endswith(".db"):
            raise ValueError("{} must end with .db".format(db_name))
        self.name = db_name
        self.conn = self.connect()
        self.cur = self.cursor()

    def __enter__(self) -> 'Database':
        """
        Entering the context
        :return: Database
        """
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        """
        Exiting the context
        :param exc_type: Exception
        :param exc_val: Exception
        :param exc_tb: Exception
        :return: None
        """
        self.conn.close()

    def connect(self) -> sqlite3.Connection:
        """
        Connect to the database
        :return: sqlite3.Connection
        """
        if not self.name:
            raise ValueError("Database name not found")
        return sqlite3.connect(self.name)

    def cursor(self) -> sqlite3.Cursor:
        """
        Get the cursor
        :return: sqlite3.Cursor
        """
        if not self.conn:
            raise ValueError("Connection not found")
        return self.conn.cursor()

    def commit(self) -> None:
        """
        Commit changes
        :return: None
        """
        if not self.conn:
            raise ValueError("Connection not found")
        self.conn.commit()

    def execute(self, sql: str, data: dict = None) -> Optional[List[tuple]]:
        """
        Execute the sql statement
        :param sql: str
        :param data: dict
        :return: Optional[List[tuple]]
        """
        if not self.cur:
            raise ValueError("Cursor not found")
        if data:
            self.cur.execute(sql, data)
        else:
            self.cur.execute(sql)
        self.commit()
        return self.cur.fetchall()
