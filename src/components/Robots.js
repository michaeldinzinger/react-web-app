/**
 * Trims the white space from the start and end of the line.
 *
 * If the line is an array it will strip the white space from
 * the start and end of each element of the array.
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L11
 * @param  {string|Array} line
 * @return {string|Array}
 * @private
 */
function trimLine(line) {
	if (!line) {
		return null;
	}

	if (Array.isArray(line)) {
		return line.map(trimLine);
	}

	return String(line).trim();
}

/**
 * Remove comments from lines
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L30
 * @param {string} line
 * @return {string}
 * @private
 */
function removeComments(line) {
	var commentStartIndex = line.indexOf('#');
	if (commentStartIndex > -1) {
		return line.substring(0, commentStartIndex);
	}

	return line;
}

/**
 * Splits a line at the first occurrence of :
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L46
 * @param  {string} line
 * @return {Array.<string>}
 * @private
 */
function splitLine(line) {
	var idx = String(line).indexOf(':');

	if (!line || idx < 0) {
		return null;
	}

	return [line.slice(0, idx), line.slice(idx + 1)];
}

/**
 * Matches a pattern with the specified path
 *
 * Uses same algorithm to match patterns as the Google implementation in
 * google/robotstxt so it should be consistent with the spec.
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L119
 * @see https://github.com/google/robotstxt/blob/f465f0ede81099dd8bc4aeb2966b3a892bd488b3/robots.cc#L74
 * @param {string} pattern
 * @param {string} path
 * @return {boolean}
 * @private
 */
function matches(pattern, path) {
	// I've added extra comments to try make this easier to understand

	// Stores the lengths of all the current matching substrings.
	// Maximum number of possible matching lengths is every length in path plus
	// 1 to handle 0 length too (if pattern starts with * which is zero or more)
	var matchingLengths = new Array(path.length + 1);
	var numMatchingLengths = 1;

	// Initially longest match is 0
	matchingLengths[0] = 0;

	for (var p = 0; p < pattern.length; p++) {
		// If $ is at the end of pattern then we must match the whole path.
		// Which is true if the longest matching length matches path length
		if (pattern[p] === '$' && p + 1 === pattern.length) {
			return matchingLengths[numMatchingLengths - 1] === path.length;
		}

		// Handle wildcards
		if (pattern[p] == '*') {
			// Wildcard so all substrings minus the current smallest matching
			// length are matches
			numMatchingLengths = path.length - matchingLengths[0] + 1;

			// Update matching lengths to include the smallest all the way up
			// to numMatchingLengths
			// Don't update smallest possible match as * matches zero or more
			// so the smallest current match is also valid
			for (var i = 1; i < numMatchingLengths; i++) {
				matchingLengths[i] = matchingLengths[i - 1] + 1;
			}
		} else {
			// Check the char at the matching length matches the pattern, if it
			// does increment it and add it as a valid length, ignore if not.
			var numMatches = 0;
			for (var i = 0; i < numMatchingLengths; i++) {
				if (
					matchingLengths[i] < path.length &&
					path[matchingLengths[i]] === pattern[p]
				) {
					matchingLengths[numMatches++] = matchingLengths[i] + 1;
				}
			}

			// No paths matched the current pattern char so not a match
			if (numMatches == 0) {
				return false;
			}

			numMatchingLengths = numMatches;
		}
	}

	return true;
}

/**
 * Returns if a pattern is allowed by the specified rules.
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L236
 * @param  {string}  path
 * @param  {Array.<Object>}  rules
 * @return {Object?}
 * @private
 */
export function findRule(path, rules) {
	var matchedRule = null;

	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];

		if (!matches(rule.pattern, path)) {
			continue;
		}

		// The longest matching rule takes precedence
		// If rules are the same length then allow takes precedence
		if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
			matchedRule = rule;
		} else if (
			rule.pattern.length == matchedRule.pattern.length &&
			rule.allow &&
			!matchedRule.allow
		) {
			matchedRule = rule;
		}
	}

	return matchedRule;
}

/**
 * Normalises the URL encoding of a path by encoding
 * unicode characters.
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L84
 * @param {string} path
 * @return {string}
 * @private
 */
export function normaliseEncoding(path) {
	try {
		return urlEncodeToUpper(encodeURI(path).replace(/%25/g, '%'));
	} catch (e) {
		return path;
	}
}

/**
 * Convert URL encodings to support case.
 *
 * e.g.: %2a%ef becomes %2A%EF
 *
 * @see https://github.com/samclarke/robots-parser/blob/dd032ec3da65e49bf2ba8d7224bd20883ef8ff34/Robots.js#L101
 * @param {string} path
 * @return {string}
 * @private
 */
function urlEncodeToUpper(path) {
	return path.replace(/%[0-9a-fA-F]{2}/g, function (match) {
		return match.toUpperCase();
	});
}

export function isValidPath(path) {
    var valid = true;
    var rules = [{
      pattern: '/',
      allow: false
    }];
    var foundRules = findRule(path, rules);
    if (!foundRules) {
      valid = false;
    }
    return valid;
}

export function isExcludedPathConsidered(excludedPath, paths) {
    var considered = true;
    var rules = [];
    for (var i = 0; i < paths.length; i++) {
      rules.push({
        pattern: paths[i],
        allow: false
      });
    }
    var foundRules = findRule(excludedPath, rules);
    if (!foundRules) {
      considered = false;
    }
    return considered;
}

export function parseRulesFromRobotsTxt(contents) {
	var newlineRegex = /\r\n|\r|\n/;
	var lines = contents
		.split(newlineRegex)
		.map(removeComments)
		.map(splitLine)
		.map(trimLine);

	var rules = { allow: [], disallow: [] };
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];

		if (!line || !line[0]) {
			continue;
		}
		
		if (line[1] === "/") {
			continue;
		}

		switch (line[0].toLowerCase()) {
			case 'disallow':
				rules["disallow"].push(line[1]);
				break;
			case 'allow':
				rules["allow"].push(line[1]);
				break;
		}
	}

	return rules;
}
