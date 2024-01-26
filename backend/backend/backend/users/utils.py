# utils.py

from cryptography.fernet import Fernet


def encrypt_data(data, key):
    cipher_suite = Fernet(key)
    cipher_text = cipher_suite.encrypt(data.encode())
    return cipher_text


def decrypt_data(cipher_text, key):
    cipher_suite = Fernet(key)
    plain_text = cipher_suite.decrypt(cipher_text).decode()
    return plain_text


# Generate a new key using cryptography library
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes  # Add this import
from base64 import urlsafe_b64encode


def generate_key():
    password = "P@ssw0rd1997"  # Change this to a strong, secret password
    salt = b"salt_123"  # Change this to a random, unique salt
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), iterations=100000, salt=salt, length=32, backend=default_backend())
    key = urlsafe_b64encode(kdf.derive(password.encode()))
    return key


SECRET_KEY = generate_key()
