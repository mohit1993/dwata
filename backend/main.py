#!/usr/bin/env python3
import argparse
import os.path

from app import make_app


def checkconfig(args):
    pass


def testconnect(args):
    pass


if __name__ == '__main__':
    from apps import app
    parser = argparse.ArgumentParser(description="Dwata backend")
    parser.add_argument(
        "action",
        action="store",
        choices=["server", "checkconfig", "testconnect"]
    )

    args = parser.parse_args()

    if args.action == "server":
        make_app()
    elif args.action == "checkconfig":
        resetdb(args)
    elif args.action == "testconnect":
        droptables(args)
