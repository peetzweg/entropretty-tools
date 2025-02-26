// Base interface for all rules
export interface BaseRule {
  name: string;
  description: string;
}

// Different possible outcomes for a check
export type CheckStatus = "pass" | "warn" | "error";

// Metadata for warnings and errors
export interface CheckMetadata {
  message: string;
  details?: Record<string, unknown>;
  location?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ComplianceResult {
  status: CheckStatus;
  metadata?: CheckMetadata[];
}

// For rules that check a single image
export interface SingleImageRule extends BaseRule {
  type: "single";
  check: (image: Buffer) => Promise<ComplianceResult>;
}

// For rules that compare two images
export interface ComparisonRule extends BaseRule {
  type: "comparison";
  compare: (
    baseImage: Buffer,
    compareImage: Buffer
  ) => Promise<ComplianceResult>;
}

// For rules that work with multiple images
export interface MultiImageRule extends BaseRule {
  type: "multi";
  checkMultiple: (images: Buffer[]) => Promise<ComplianceResult>;
}

// Union type for all possible rules
export type ComplianceRule = SingleImageRule | ComparisonRule | MultiImageRule;

export interface ComplianceReport {
  ruleName: string;
  result: ComplianceResult;
}

export interface PreprocessorConfig {
  colorMerge: {
    tolerance: number; // How similar colors need to be to be merged
  };
}
