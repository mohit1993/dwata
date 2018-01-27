import pytest

from base.settings import settings


INISTR = """
[databases]
DB_ONE=postgresql+psycopg2://postgres@localhost/sample_database
DB_TWO=postgresql+psycopg2://postgres@localhost/two_database
"""


@pytest.fixture(scope="module")
def fake_settings(request):
    settings.read_db_settings(settings_str=INISTR)
    return settings


def test_read_settings(fake_settings):
    assert len(fake_settings.databases.keys()) == 2
    for name, sett in fake_settings.databases.items():
        assert name in ["one", "two"]
        assert "postgresql" in sett
