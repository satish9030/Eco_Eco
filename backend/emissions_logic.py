def calculate_allowed_limit(base_limit, air_quality_index):
    # Simple rule (hackathon-safe)
    adjusted_limit = base_limit - (air_quality_index * 0.5)

    if adjusted_limit < 50:
        adjusted_limit = 50

    return round(adjusted_limit, 2)
