# Generated by Django 4.2.6 on 2023-10-17 05:31

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("data_analysis", "0002_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="team_id",
        ),
    ]
