package by.tsarenkov.common.model.enumeration;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Genre {
    ART,
    AUTOBIOGRAPHY,
    BIOGRAPHY,
    BUSINESS,
    COOKBOOK,
    DICTIONARY,
    ENCYCLOPEDIA,
    GUIDE,
    HEALTH,
    HISTORY,
    PHILOSOPHY,
    SCIENCE,
    RELIGION,
    ADVENTURE,
    KINDS,
    CLASSIC,
    DRAMA,
    FAIRYTALE,
    FANTASY,
    HORROR,
    MYSTERY,
    POETRY,
    ROMANCE,
    THRILLER;

    @JsonValue
    public int value() {
        return ordinal();
    }
}
