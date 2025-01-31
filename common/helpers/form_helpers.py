import json
from common.helpers.collections import find_first
from common.models.tags import Tag
from common.helpers.date_helpers import parse_front_end_datetime
from distutils.util import strtobool
from django.contrib.gis.geos import Point


def read_form_field_string(model, form, field_name, transformation=None):
    """
    :param model: Model containing string field
    :param form: Form data from front-end
    :param field_name: Name of field shared by model and form
    :param transformation: Transformation of form data to perform before inserting into model
    :return: True if changes to model string field were made
    """
    field_changed = False
    if field_name in form.data:
        form_field_content = form.data.get(field_name)
        if transformation is not None:
            form_field_content = transformation(form_field_content)
        field_changed = getattr(model, field_name) != form_field_content
        setattr(model, field_name, form_field_content)
    return field_changed


def read_form_field_boolean(model, form, field_name):
    """
    :param model: Model containing boolean field
    :param form: Form data from front-end
    :param field_name: Name of field shared by model and form
    :return: True if changes to model boolean field were made
    """
    return read_form_field_string(model, form, field_name, lambda str: strtobool(str))


def read_form_field_datetime(model, form, field_name):
    """
    :param model: Model containing datetime field
    :param form: Form data from front-end
    :param field_name: Name of field shared by model and form
    :return: True if changes to model datetime field were made
    """
    return read_form_field_string(model, form, field_name, lambda str: parse_front_end_datetime(str))


def read_form_field_tags(model, form, field_name):
    """
    Read tags form field into model field
    :param model: Model containing tag field
    :param form: Form data from front-end
    :param field_name: Name of field shared by model and form
    :return: True if changes to model tag field were made
    """
    if field_name in form.data:
        return Tag.merge_tags_field(getattr(model, field_name), form.data.get(field_name))
    return False


def read_form_fields_point(model, form, point_field_name, lat_field_name, long_field_name):
    if lat_field_name in form.data and long_field_name in form.data:
        lat = form.data.get(lat_field_name)
        long = form.data.get(long_field_name)
        if len(lat) > 0 and len(long) > 0:
            setattr(model, point_field_name, Point(float(long), float(lat)))


def merge_json_changes(model_class, model, form, field_name):
    """
    Merge changes from json form field to model field
    :param model_class: Model class
    :param model: Model instance
    :param form: form wrapper
    :param field_name: field name in model and form
    :return: True if there were changes
    """
    if field_name in form.data:
        json_text = form.data.get(field_name)
        if len(json_text) > 0:
            json_object = json.loads(json_text)
            return model_class.merge_changes(model, json_object)
    return False


def merge_single_file(model, form, file_category, field_name):
    """
    Merge change for a single file form field
    :param model: Model instance
    :param form: form wrapper
    :param file_category: File type
    :param field_name: field name in model and form
    :return: True if there were changes
    """
    from civictechprojects.models import ProjectFile
    field_changed = False
    if field_name in form.data:
        file_content = form.data.get(field_name)
        if file_content and len(file_content) > 0:
            file_json = json.loads(file_content)
            field_changed = ProjectFile.replace_single_file(model, file_category, file_json)
    return field_changed


def is_json_field_empty(field_json):
    if isinstance(field_json, dict):
        return len(field_json.keys()) == 0
    else:
        return len(field_json) == 0


def is_creator(user, entity):
    from civictechprojects.models import Project, Group
    if type(entity) is Project:
        return user.username == entity.project_creator.username
    elif type(entity) is Group:
        return user.username == entity.group_creator.username
    else:
        return user.username == entity.event_creator.username

def is_co_owner(user, project):
    from civictechprojects.models import VolunteerRelation
    volunteer_relations = VolunteerRelation.objects.filter(project_id=project.id, volunteer_id=user.id)
    co_owner_relationship = find_first(volunteer_relations, lambda volunteer_relation: volunteer_relation.is_co_owner)
    return co_owner_relationship is not None

def is_co_owner_or_owner(user, project):
    return is_creator(user, project) or is_co_owner(user, project)

def is_co_owner_or_staff(user, project):
    if user is not None:
        return is_creator(user, project) or is_co_owner(user, project) or user.is_staff


def is_creator_or_staff(user, entity):
    return is_creator(user, entity) or user.is_staff
